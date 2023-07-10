import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const APIMaps = () => {
    const [bancos, setBancos] = useState([]);
    const [selectedBanco, setSelectedBanco] = useState(null);
    const [loading, setLoading] = useState(true); 

    const GOOGLE_MAPS_API_KEY = 'AIzaSyApGZxZB5TdxyHo32kfgU18HtgKsrpQ2ik';

    const mapCenter = {
        lat: 18.481982,
        lng: -69.952179
    };

    useEffect(() => {
        const fetchBancosData = async () => {
            const res = await axios.get('https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/BancoSangre');
            const bancosDataPromises = res.data.body.map(async (banco) => {
                try {
                    const detailsRes = await axios.get(`https://nodejs-sequelize-restapi-mssql-production.up.railway.app/api/v1/BancoSangre/Nombre/${banco.Nombre_BancoSangre}`);
                    const availableBloodTypes = detailsRes.data.body.filter(banco => banco.Estado_Pinta === 'Vigente').reduce((types, banco) => {
                        if (!types[banco.Tipo_Pinta]) {
                            types[banco.Tipo_Pinta] = 0;
                        }
                        types[banco.Tipo_Pinta]++;
                        return types;
                    }, {});

                    return {
                        nombre: banco.Nombre_BancoSangre,
                        location: { lat: parseFloat(banco.Latitud_BancoSangre), lng: parseFloat(banco.Longitud_BancoSangre) },
                        details: availableBloodTypes,
                    };
                } catch (error) {
                    return {
                        nombre: banco.Nombre_BancoSangre,
                        location: { lat: parseFloat(banco.Latitud_BancoSangre), lng: parseFloat(banco.Longitud_BancoSangre) },
                        details: {},
                    };
                }
            });

            const bancosData = await Promise.all(bancosDataPromises);
            setBancos(bancosData);
            setLoading(false);
        };
        fetchBancosData();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                center={mapCenter}
                zoom={13}
                mapContainerStyle={{ width: '100%', height: '1000px' }}
            >
                {bancos.map((banco) => {
                    const bloodBankIcon = {
                        url: 'data:image/svg+xml;utf-8,<svg xmlns=\'http://www.w3.org/2000/svg\' enable-background=\'new 0 0 24 24\' height=\'24px\' viewBox=\'0 0 24 24\' width=\'24px\' fill=\'%23000000\'><rect fill=\'none\' height=\'24\' width=\'24\'/><path d=\'M12,3L2,12h3v8h14v-8h3L12,3z M12,16c-1.1,0-2-0.9-2-2c0-1.1,2-4,2-4s2,2.9,2,4C14,15.1,13.1,16,12,16z\'/></svg>',
                        scaledSize: window.google && window.google.maps ? new window.google.maps.Size(30, 30) : undefined,
                    };
                    return (
                        <Marker 
                            icon={bloodBankIcon}
                            key={banco.nombre}
                            position={banco.location}
                            onClick={() => {
                                setSelectedBanco(banco);
                            }}
                        />
                    );
                })}
                {selectedBanco && (
                    <InfoWindow
                        position={selectedBanco.location}
                        onCloseClick={() => {
                            setSelectedBanco(null);
                        }}
                    >
                        <div>
                            <h2>{selectedBanco.nombre}</h2>
                            {Object.entries(selectedBanco.details).map(([bloodType, count]) => (
                                <p key={bloodType}>{`${bloodType} disponible: ${count}`}</p>
                            ))}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default APIMaps;
