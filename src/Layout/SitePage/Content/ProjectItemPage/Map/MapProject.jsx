import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './mapproject.module.css';

export default function MapProject(props) {
  return (
    <div className={styles.itemMap}>
      <YMaps styles={{ width: '100% !important;', height: '100% !important;' }}>
        <Map
          width = {'100%'}
          height = {'100%'}
          defaultState={{ center: props.coordinates.split(','), zoom: 14 }}
        >
          <Placemark defaultGeometry={props.coordinates.split(',')} />
        </Map>
      </YMaps>
    </div>
  );
}
