import React, { useState } from 'react';
import falabellaData from '../data/falabellaData.json';
import './McKinseyMatrix.css';

const McKinseyMatrix = () => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const { metadata, businessUnits, quadrants } = falabellaData;

    // Función para calcular el tamaño de la burbuja basado en ventas
    const calculateBubbleSize = (sales) => {
        const maxSales = Math.max(...businessUnits.map(unit => unit.sales));
        const minSize = 40;
        const maxSize = 120;
        return minSize + (sales / maxSales) * (maxSize - minSize);
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
                    <p className="header-subtitle">{metadata.description}</p>
                    <div className="header-meta">
                    </div>
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
                            {/* Fondo de cuadrantes */}
                            <div className="quadrants-background">
                                <div className="quadrant quadrant-stars">
                                    <span className="quadrant-label">⭐ STARS</span>
                                </div>
                                <div className="quadrant quadrant-questions">
                                    <span className="quadrant-label">❓ QUESTION MARKS</span>
                                </div>
                                <div className="quadrant quadrant-cows">
                                    <span className="quadrant-label">🐄 CASH COWS</span>
                                </div>
                                <div className="quadrant quadrant-dogs">
                                    <span className="quadrant-label">🐕 DOGS</span>
                                </div>
                            </div>

                            {/* Líneas divisorias */}
                            <div className="matrix-lines">
                                <div className="vertical-line"></div>
                                <div className="horizontal-line"></div>
                            </div>

                            {/* Burbujas de unidades de negocio */}
                            {businessUnits.map((unit) => {
                                const size = calculateBubbleSize(unit.sales);
                                const x = (unit.position.x / 100) * 100;
                                const y = 100 - (unit.position.y / 100) * 100;

                                return (
                                    <div
                                        key={unit.id}
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

                                            {/* Burbuja principal */}
                                            <div
                                                className="bubble"
                                                style={{
                                                    background: `linear-gradient(135deg, ${unit.color} 0%, ${unit.color}dd 100%)`,
                                                    boxShadow: `0 10px 25px -5px ${unit.color}40, 0 10px 20px -5px rgba(0,0,0,0.1)`
                                                }}
                                            >
                                                <div className="bubble-text">
                                                    {unit.name.length > 15 ?
                                                        unit.name.split(' ').map((word, i) => (
                                                            <div key={i}>{word}</div>
                                                        ))
                                                        : unit.name
                                                    }
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
                                                        <div className="tooltip-label">Score Interno</div>
                                                        <div className="tooltip-value value-internal">{unit.internalFactors.score}</div>
                                                    </div>
                                                    <div className="tooltip-item">
                                                        <div className="tooltip-label">Score Externo</div>
                                                        <div className="tooltip-value value-external">{unit.externalFactors.score}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Labels de los ejes */}
                    <div className="axis-label y-axis-label">
                        {metadata.yAxis}
                    </div>
                    <div className="axis-label x-axis-label">
                        {metadata.xAxis}
                    </div>

                    {/* Escalas */}
                    <div className="scale-label scale-top scale-high">Alto</div>
                    <div className="scale-label scale-bottom scale-low">Bajo</div>
                    <div className="scale-label scale-left scale-low">Bajo</div>
                    <div className="scale-label scale-right scale-high">Alto</div>
                </div>
            </div>

            {/* Leyenda de cuadrantes */}
            <div className="legend-grid">
                {quadrants.map((quadrant, index) => {
                    const icons = ['⭐', '❓', '🐄', '🐕'];
                    const headerClasses = [
                        'quadrant-stars',
                        'quadrant-questions',
                        'quadrant-cows',
                        'quadrant-dogs'
                    ];

                    return (
                        <div key={index} className="legend-card">
                            <div className={`legend-header ${headerClasses[index]}`}>
                                <h3 className="legend-title">{quadrant.name}</h3>
                                <span className="legend-icon">{icons[index]}</span>
                            </div>
                            <div className="legend-content">
                                <p className="legend-description">{quadrant.description}</p>
                                <div className="legend-strategy-label">Estrategia</div>
                                <p className="legend-strategy">{quadrant.strategy}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tabla de datos mejorada */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2" />
                        </svg>
                        <h3 className="text-xl font-bold">Datos Detallados por Unidad de Negocio</h3>
                    </div>
                    <p className="text-gray-300 mt-2">Análisis comparativo de métricas clave</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Unidad de Negocio</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ventas</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Participación</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Score Interno</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Score Externo</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Categoría</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {businessUnits.map((unit, index) => (
                                <tr key={unit.id} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <div
                                                    className="w-5 h-5 rounded-full mr-4 shadow-lg"
                                                    style={{ backgroundColor: unit.color }}
                                                ></div>
                                                <div
                                                    className="absolute inset-0 w-5 h-5 rounded-full animate-ping opacity-25"
                                                    style={{ backgroundColor: unit.color }}
                                                ></div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">{unit.name}</div>
                                                <div className="text-xs text-gray-500">{unit.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-bold text-green-600">{formatNumber(unit.sales)}</div>
                                        <div className="text-xs text-gray-500">Ingresos</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-bold text-blue-600">{formatPercentage(unit.marketShare)}</div>
                                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${unit.marketShare * 100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm font-bold text-yellow-600">{unit.internalFactors.score}</span>
                                            <div className="ml-2 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3 h-3 ${i < unit.internalFactors.score ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm font-bold text-purple-600">{unit.externalFactors.score}</span>
                                            <div className="ml-2 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3 h-3 ${i < unit.externalFactors.score ? 'text-purple-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${unit.category === 'star' ? 'bg-emerald-100 text-emerald-800' :
                                            unit.category === 'cash-cow' ? 'bg-blue-100 text-blue-800' :
                                                unit.category === 'question-mark' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {unit.category.replace('-', ' ').toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default McKinseyMatrix;