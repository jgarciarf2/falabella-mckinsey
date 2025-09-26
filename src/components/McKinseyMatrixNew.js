import React, { useState } from 'react';
import falabellaData from '../data/falabellaData.json';
import './McKinseyMatrix.css';

const McKinseyMatrix = () => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const { metadata, businessUnits, factoresInternos, factoresExternos } = falabellaData;

    // Función para calcular el tamaño de la burbuja basado en participación de mercado
    const calculateBubbleSize = (marketShare) => {
        const maxShare = Math.max(...businessUnits.map(unit => unit.marketShare));
        const minSize = 60;
        const maxSize = 180;
        return minSize + (marketShare / maxShare) * (maxSize - minSize);
    };

    // Función para formatear números
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(1)}M`;
        }
        return `$${num.toLocaleString()}`;
    };

    // Función para formatear porcentaje
    const formatPercentage = (num) => {
        return `${(num * 100).toFixed(1)}%`;
    };

    // Función para renderizar flechas direccionales
    const renderArrow = (unit) => {
        const { arrow } = unit;
        const arrowStyles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 15
        };

        const getArrowPath = (direction, length) => {
            switch (direction) {
                case 'up':
                    return `M 0 ${length} L 0 0 M -5 5 L 0 0 L 5 5`;
                case 'up-right':
                    return `M 0 ${length} L ${length} 0 M ${length - 8} 5 L ${length} 0 L ${length - 5} 8`;
                case 'right':
                    return `M 0 0 L ${length} 0 M ${length - 5} -5 L ${length} 0 L ${length - 5} 5`;
                case 'down-right':
                    return `M 0 0 L ${length} ${length} M ${length - 5} ${length - 8} L ${length} ${length} L ${length - 8} ${length - 5}`;
                default:
                    return '';
            }
        };

        return (
            <div style={arrowStyles}>
                <svg width={arrow.length + 10} height={arrow.length + 10} style={{ overflow: 'visible' }}>
                    <path
                        d={getArrowPath(arrow.direction, arrow.length)}
                        stroke="#374151"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        );
    };

    return (
        <div className="mckinsey-container">
            <div className="matrix-wrapper">
                {/* Header moderno */}
                <div className="header-card fade-in-up">
                    <div className="header-icon">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h1 className="header-title">{metadata.title}</h1>
                </div>

                {/* Matriz Principal */}
                <div className="matrix-card fade-in-up">
                    <div className="matrix-header">
                        <h2 className="matrix-title">Matriz de Análisis Estratégico</h2>
                        <p className="matrix-description">Posicionamiento de unidades de negocio según fortaleza interna y atractivo del mercado</p>
                    </div>

                    {/* Container principal de la matriz */}
                    <div className="matrix-container">
                        <div className="matrix-grid">
                            {/* Fondo de cuadrantes - Matriz McKinsey 3x3 */}
                            <div className="quadrants-background">
                                <div className="quadrant quadrant-1">
                                    <span className="quadrant-label">Proteger posición</span>
                                </div>
                                <div className="quadrant quadrant-2">
                                    <span className="quadrant-label">Invertir para construir</span>
                                </div>
                                <div className="quadrant quadrant-3">
                                    <span className="quadrant-label">Construir selectivamente</span>
                                </div>
                                <div className="quadrant quadrant-4">
                                    <span className="quadrant-label">Construir selectivamente</span>
                                </div>
                                <div className="quadrant quadrant-5">
                                    <span className="quadrant-label">Crecimiento selectivo</span>
                                </div>
                                <div className="quadrant quadrant-6">
                                    <span className="quadrant-label">Proteger y reenfocar</span>
                                </div>
                                <div className="quadrant quadrant-7">
                                    <span className="quadrant-label">Expansión limitada</span>
                                </div>
                                <div className="quadrant quadrant-8">
                                    <span className="quadrant-label">Administrar ganancias</span>
                                </div>
                                <div className="quadrant quadrant-9">
                                    <span className="quadrant-label">Desinvertir</span>
                                </div>
                            </div>

                            {/* Líneas divisorias */}
                            <div className="matrix-lines">
                                <div className="vertical-line-1"></div>
                                <div className="vertical-line-2"></div>
                                <div className="horizontal-line-1"></div>
                                <div className="horizontal-line-2"></div>
                            </div>

                            {/* Burbujas de unidades de negocio */}
                            {businessUnits.map((unit) => {
                                const size = calculateBubbleSize(unit.marketShare);
                                const x = (unit.fortaleza / 6) * 100;
                                const y = 100 - (unit.atractivo / 6) * 100;

                                return (
                                    <div key={unit.id}>
                                        {/* Burbuja */}
                                        <div
                                            className="business-unit"
                                            style={{
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                width: `${size}px`,
                                                height: `${size}px`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                            onClick={() => setSelectedUnit(unit)}
                                            onMouseEnter={() => setSelectedUnit(unit)}
                                            onMouseLeave={() => setSelectedUnit(null)}
                                        >
                                            <div className="bubble-container">
                                                {/* Sombra */}
                                                <div
                                                    className="bubble-shadow"
                                                    style={{ backgroundColor: unit.color }}
                                                ></div>

                                                {/* Burbuja con gráfico de torta */}
                                                <div
                                                    className="bubble"
                                                    style={{
                                                        '--unit-color': unit.color,
                                                        '--market-share': unit.marketShare * 100
                                                    }}
                                                >
                                                    <div className="bubble-text">
                                                        <div className="bubble-percentage">
                                                            {(unit.marketShare * 100).toFixed(0)}%
                                                        </div>
                                                        <div className="bubble-label">
                                                            {unit.name.length > 12 ?
                                                                unit.name.split(' ')[0] + (unit.name.split(' ')[1] ? ' ' + unit.name.split(' ')[1] : '') :
                                                                unit.name
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tooltip */}
                                            {selectedUnit?.id === unit.id && (
                                                <div className="tooltip">
                                                    <div className="tooltip-header">{unit.name}</div>
                                                    <div className="tooltip-grid">
                                                        <div className="tooltip-item">
                                                            <div className="tooltip-label">Ventas</div>
                                                            <div className="tooltip-value value-sales">{formatNumber(unit.sales)}</div>
                                                        </div>
                                                        <div className="tooltip-item">
                                                            <div className="tooltip-label">Participación</div>
                                                            <div className="tooltip-value value-market">{formatPercentage(unit.marketShare)}</div>
                                                        </div>
                                                        <div className="tooltip-item">
                                                            <div className="tooltip-label">Fortaleza</div>
                                                            <div className="tooltip-value value-internal">{unit.fortaleza}</div>
                                                        </div>
                                                        <div className="tooltip-item">
                                                            <div className="tooltip-label">Atractivo</div>
                                                            <div className="tooltip-value value-external">{unit.atractivo}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Flecha direccional */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                left: `${x}%`,
                                                top: `${y}%`,
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'none',
                                                zIndex: 15
                                            }}
                                        >
                                            {renderArrow(unit)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Labels de los ejes */}
                        <div className="axis-label y-axis-label">
                            {metadata.yAxis}
                        </div>
                        <div className="axis-label x-axis-label">
                            {metadata.xAxis}
                        </div>

                        {/* Escalas */}
                        <div className="scale-label scale-top scale-high">6</div>
                        <div className="scale-label scale-bottom scale-low">0</div>
                        <div className="scale-label scale-left scale-low">0</div>
                        <div className="scale-label scale-right scale-high">6</div>
                    </div>
                </div>

                {/* Tablas de Factores */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                    {/* Tabla Factores Internos */}
                    <div className="data-table-card">
                        <div className="table-header">
                            <h3 className="table-title">Factores Internos</h3>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead className="table-head">
                                    <tr>
                                        <th>Unidades</th>
                                        <th>Omnicanal 30%</th>
                                        <th>Sostenibilidad 25%</th>
                                        <th>Logística 25%</th>
                                        <th>Talento 20%</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {factoresInternos.map((factor, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="table-cell" style={{ fontWeight: 'bold' }}>{factor.unidad}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.omnicanal.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.sostenibilidad.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.logistica.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.talento.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center', fontWeight: 'bold', color: '#059669' }}>{factor.scoreTotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tabla Factores Externos */}
                    <div className="data-table-card">
                        <div className="table-header">
                            <h3 className="table-title">Factores Externos</h3>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead className="table-head">
                                    <tr>
                                        <th>Unidades</th>
                                        <th>Tamaño 25%</th>
                                        <th>Crecimiento 50%</th>
                                        <th>Rentabilidad 25%</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {factoresExternos.map((factor, index) => (
                                        <tr key={index} className="table-row">
                                            <td className="table-cell" style={{ fontWeight: 'bold' }}>{factor.unidad}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.tamano.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.crecimiento.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center' }}>{factor.rentabilidad.valor}</td>
                                            <td className="table-cell" style={{ textAlign: 'center', fontWeight: 'bold', color: '#7c3aed' }}>{factor.scoreTotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                {/* Tabla de datos */}
                <div className="data-table-card">
                    <div className="table-header">
                        <h3 className="table-title">Datos Detallados por Unidad de Negocio</h3>
                        <p className="table-subtitle">Análisis comparativo de métricas clave</p>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead className="table-head">
                                <tr>
                                    <th>Falabella</th>
                                    <th>Ventas</th>
                                    <th>Participación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {businessUnits.map((unit, index) => (
                                    <tr key={unit.id} className="table-row">
                                        <td className="table-cell">
                                            <div className="unit-info">
                                                <div
                                                    className="unit-color"
                                                    style={{ backgroundColor: unit.color }}
                                                ></div>
                                                <div>
                                                    <div className="unit-name">{unit.name}</div>
                                                    <div className="unit-category">{unit.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell" style={{ textAlign: 'center' }}>
                                            <div className="metric-value" style={{ color: '#10b981' }}>
                                                {unit.sales.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="table-cell" style={{ textAlign: 'center' }}>
                                            <div className="metric-value" style={{ color: '#3b82f6' }}>
                                                {(unit.marketShare * 100).toFixed(1)}%
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default McKinseyMatrix;