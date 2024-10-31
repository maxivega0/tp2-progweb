import React from 'react';
import '../../styles/common/table.css';

const Table = ({ columns, data, loading }) => {
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={`${row.id}-${column.accessor}`}>
                {column.Cell ? 
                  column.Cell({ row }) : 
                  row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;