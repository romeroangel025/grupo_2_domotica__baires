import React from 'react';
import { Categories } from '../components/categories/Categories';
import { LastProduct } from '../components/lastProduct/LastProduct';
import {Metrics} from '../components/metricas/Metrics'

export const Home = () => {
  return (
    <div className="container-fluid">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Domótica Baires</h1>
    </div>

    <Metrics/>




    <div className="row">

        <LastProduct/>

    <Categories/>

    
    </div>
</div>
  )
}