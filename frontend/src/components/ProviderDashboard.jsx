import React, { useState } from 'react';
import axios from 'axios';

function ProviderDashboard() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [results, setResults] = useState([]);
    
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isAILoading, setIsAILoading] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState('');

    const colors = {
        bg: '#F8FAFC',
        card: '#FFFFFF',
        primary: '#1BA08E',
        primaryHover: '#148575',
        primaryLight: '#E8F6F4',
        textMain: '#1E293B',
        textMuted: '#64748B',
        border: '#E2E8F0',
        dangerBg: '#FEF2F2',
        dangerText: '#EF4444'
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Please select a file first.');
            return;
        }

        setStatus('Uploading and analyzing...');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/reports/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setStatus('Success! Data extracted.');
            setResults(response.data);
            setSelectedMarker(null);
        } catch (error) {
            console.error(error);
            setStatus('Error uploading file. Make sure Java and Python are running.');
        }
    };

    const getRangeStatus = (value, low, high) => {
        if (value < low) return { label: 'LOW', color: colors.dangerText, bg: colors.dangerBg };
        if (value > high) return { label: 'HIGH', color: colors.dangerText, bg: colors.dangerBg };
        return { label: 'OPTIMAL', color: colors.primary, bg: colors.primaryLight };
    };

    const handleRowClick = (item) => {
        setSelectedMarker(item);
        setIsAILoading(true);
        setAiAnalysis('');

        const status = getRangeStatus(item.value, item.referenceLow, item.referenceHigh);

        setTimeout(() => {
            let generatedText = `Based on the latest data, the patient's ${item.biomarkerName} is ${item.value} ${item.unit}.\n\n`;
            
            if (status.label === 'OPTIMAL') {
                generatedText += `This falls perfectly within the healthy reference range (${item.referenceLow} - ${item.referenceHigh}). No immediate lifestyle interventions are required.`;
            } else if (status.label === 'LOW') {
                generatedText += `This is BELOW the recommended minimum of ${item.referenceLow}. Consider evaluating for deficiencies and adjusting diet or supplementation.`;
            } else {
                generatedText += `This is ABOVE the recommended maximum of ${item.referenceHigh}. Elevated levels can indicate inflammation or underlying metabolic stress. Clinical correlation is recommended.`;
            }

            setAiAnalysis(generatedText);
            setIsAILoading(false);
        }, 1500);
    };

    const cardStyle = {
        backgroundColor: colors.card,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        border: `1px solid ${colors.border}`,
        width: '100%',
        boxSizing: 'border-box'
    };

    return (
        <div style={{ backgroundColor: colors.bg, minHeight: '100vh', width: '100%', padding: '40px', boxSizing: 'border-box', fontFamily: '"Inter", system-ui, -apple-system, sans-serif', color: colors.textMain }}>
            
            <div style={{ width: '100%', maxWidth: '1800px', margin: '0 auto' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: colors.primary, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2.038 2.038 0 0 0 1.847 2.95h10.866a2.037 2.037 0 0 0 1.846-2.95l-5.068-10.127A2 2 0 0 1 14 9.527V2" />
                                <path d="M8.5 2h7" />
                                <path d="M6 16h12" />
                            </svg>
                        </div>
                        <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', color: colors.primary }}>LabAnalytics</h2>
                    </div>
                    <div style={{ color: colors.primary, fontSize: '14px', fontWeight: '600', backgroundColor: colors.primaryLight, padding: '8px 16px', borderRadius: '20px' }}>
                        Clinical Dashboard
                    </div>
                </div>
                
                {/* Upload Card */}
                <div style={{ ...cardStyle, display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: colors.textMain }}>Upload Patient Report</h3>
                        <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: colors.textMuted }}>Select a standard lab PDF to extract structured biomarker data.</p>
                        <input type="file" onChange={handleFileChange} accept="application/pdf" style={{ width: '100%', color: colors.textMuted, fontSize: '14px' }} />
                    </div>
                    <button 
                        onClick={handleUpload} 
                        style={{ 
                            padding: '14px 28px', backgroundColor: colors.primary, color: '#FFF', border: 'none', borderRadius: '12px', cursor: 'pointer',
                            fontSize: '15px', fontWeight: '600', transition: 'background-color 0.2s', flex: '1 1 150px', maxWidth: '200px'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                    >
                        Analyze PDF
                    </button>
                </div>

                {status && (
                    <div style={{ marginBottom: '30px', padding: '16px 20px', borderRadius: '12px', backgroundColor: status.includes('Error') ? colors.dangerBg : colors.primaryLight, color: status.includes('Error') ? colors.dangerText : colors.primary, fontWeight: '600', fontSize: '14px' }}>
                        {status}
                    </div>
                )}

                {/* Results Section */}
                {results.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', width: '100%' }}>
                        
                        {/* Left Side: Data Table Card */}
                        <div style={{ ...cardStyle, flex: '2 1 600px', padding: '24px', overflowX: 'auto' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', paddingLeft: '8px', color: colors.textMain }}>Extracted Biomarkers</h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '450px' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: '16px 12px', borderBottom: `2px solid ${colors.border}`, color: colors.textMuted, fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Biomarker</th>
                                        <th style={{ padding: '16px 12px', borderBottom: `2px solid ${colors.border}`, color: colors.textMuted, fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Result</th>
                                        <th style={{ padding: '16px 12px', borderBottom: `2px solid ${colors.border}`, color: colors.textMuted, fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((item, index) => {
                                        const rangeCheck = getRangeStatus(item.value, item.referenceLow, item.referenceHigh);
                                        const isSelected = selectedMarker?.biomarkerName === item.biomarkerName;

                                        return (
                                            <tr 
                                                key={index} 
                                                onClick={() => handleRowClick(item)}
                                                style={{ 
                                                    backgroundColor: isSelected ? colors.primaryLight : 'transparent',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                }}
                                                onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = '#F1F5F9' }}
                                                onMouseOut={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent' }}
                                            >
                                                <td style={{ padding: '16px 12px', borderBottom: `1px solid ${colors.border}`, fontWeight: '600', fontSize: '15px' }}>
                                                    {item.biomarkerName}
                                                </td>
                                                <td style={{ padding: '16px 12px', borderBottom: `1px solid ${colors.border}`, fontWeight: '700', fontSize: '15px' }}>
                                                    {item.value} <span style={{ fontSize: '13px', color: colors.textMuted, fontWeight: '500' }}>{item.unit}</span>
                                                </td>
                                                <td style={{ padding: '16px 12px', borderBottom: `1px solid ${colors.border}` }}>
                                                    <span style={{ backgroundColor: rangeCheck.bg, color: rangeCheck.color, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                                                        {rangeCheck.label}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Right Side: Clean AI Panel */}
                        <div style={{ flex: '1 1 400px' }}>
                            {selectedMarker ? (
                                <div style={{ ...cardStyle, position: 'sticky', top: '20px', borderTop: `4px solid ${colors.primary}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                                        <div style={{ backgroundColor: colors.primaryLight, width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                                            <span style={{ fontSize: '20px' }}>✨</span>
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: colors.primary }}>Clinic Note</h4>
                                            <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>Summary</p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ backgroundColor: colors.primaryLight, padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                                        <p style={{ fontSize: '14px', color: colors.primaryHover, margin: 0 }}>
                                            Analyzing: <strong style={{ color: colors.primary }}>{selectedMarker.biomarkerName}</strong>
                                        </p>
                                    </div>
                                    
                                    {isAILoading ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.primary, padding: '20px 0' }}>
                                            <div style={{ width: '20px', height: '20px', border: '3px solid #E8F6F4', borderTopColor: colors.primary, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                            <span style={{ fontSize: '15px', fontWeight: '600' }}>Synthesizing data...</span>
                                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                                        </div>
                                    ) : (
                                        <p style={{ lineHeight: '1.8', fontSize: '15px', margin: 0, whiteSpace: 'pre-line', color: colors.textMain }}>
                                            {aiAnalysis}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div style={{ ...cardStyle, backgroundColor: 'transparent', border: `2px dashed ${colors.primary}`, boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px' }}>
                                    <div style={{ width: '64px', height: '64px', backgroundColor: colors.primaryLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px', color: colors.primary }}>
                                        ✨
                                    </div>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: colors.primary }}>No Biomarker Selected</h4>
                                    <p style={{ margin: 0, fontSize: '14px', color: colors.textMuted, maxWidth: '200px' }}>Click any row in the table to view AI-generated clinical insights.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProviderDashboard;