import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

interface DataTableProps {
  columns: ColumnsType<any>;
  data: any[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, loading }) => {
  return (
    <TableContainer>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </TableContainer>
  );
};

export default DataTable;
