import React from 'react';
import './TableEv.css'

import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'



const TableEv = ({dados, fnDelete = null, fnUpdate = null}) => {
    return (
        <table className='table-data'>
             <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>

                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>

       <tbody>

        {dados.map((ev) => {
          return (
             <tr className="table-data__head-row" key={ev.idEvento}>
              <td className="table-data__data table-data__data--big">
                {ev.nomeEvento}
              </td>

              <td className="table-data__data table-data__data--little">
                <img 
                idtipoevento= {ev.idEvento}
                className="table-data__icon" 
                src={editPen}
                 alt=""
                onClick={(e) => {
                  fnUpdate(ev.idEvento)
                }} />
              </td>

              <td className="table-data__data table-data__data--little" 
              >
                <img 
                idtipoevento= {ev.idEvento}
                className="table-data__icon" 
                src={trashDelete} 
                alt="" 
                onClick={(e) => {
                  fnDelete(ev.idEvento)
                  }} />
              </td>
            </tr>
          )
        })}
           
      </tbody>
        </table>
    );
};

export default TableEv;