import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Button, Space, Select, Form, InputNumber, message } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { supabase } from '../../supabaseClient';

const { Option } = Select;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding: 80px 20px;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

interface CustomerData {
  id?: string;
  name: string;
  customerid: string;
  servicetype: 'loans' | 'insurance' | 'credit cards';
  serviceamount: number;
  points: number;
  created_at?: string;
}

const EditableCell: React.FC<any> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;
  
  switch (inputType) {
    case 'number':
      inputNode = <InputNumber min={0} style={{ width: '100%' }} />;
      break;
    case 'select':
      inputNode = (
        <Select style={{ width: '100%' }}>
          <Option value="loans">Loans</Option>
          <Option value="insurance">Insurance</Option>
          <Option value="credit cards">Credit Cards</Option>
        </Select>
      );
      break;
    default:
      inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EmployeeDM: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<CustomerData[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        message.error('Please login to access this page');
        // You might want to redirect to login page here
        return;
      }
      fetchCustomerPoints();
    };
    
    checkAuth();
  }, []);

  const fetchCustomerPoints = async () => {
    try {
      setLoading(true);
      const { data: customerPoints, error } = await supabase
        .from('customer_points')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setData(customerPoints || []);
    } catch (error) {
      console.error('Error fetching customer points:', error);
      message.error('Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  const isEditing = (record: CustomerData) => record.id === editingKey;

  const edit = (record: CustomerData) => {
    form.setFieldsValue({ 
      name: record.name,
      customerid: record.customerid,
      servicetype: record.servicetype,
      serviceamount: record.serviceamount,
      points: record.points
    });
    setEditingKey(record.id!);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };

        const { error } = await supabase
          .from('customer_points')
          .update(updatedItem)
          .eq('id', key);

        if (error) {
          throw error;
        }

        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey('');
        message.success('Customer data updated successfully');
      }
    } catch (error: any) {
      console.error('Error saving:', error);
      message.error(error.message || 'Failed to save changes');
    }
  };

  const addNewRow = async () => {
    const newRow = {
      name: '',
      customerid: '',
      servicetype: 'loans',
      serviceamount: 0,
      points: 0,
      created_at: new Date().toISOString(),
    };

    try {
      const { data: insertedRow, error } = await supabase
        .from('customer_points')
        .insert([newRow])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (insertedRow) {
        setData([...data, insertedRow]);
        edit(insertedRow);
        message.success('New row added successfully');
      }
    } catch (error: any) {
      console.error('Error adding new row:', error);
      message.error(error.message || 'Failed to add new row');
    }
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerid',
      width: '20%',
      editable: true,
    },
    {
      title: 'Service Type',
      dataIndex: 'servicetype',
      width: '20%',
      editable: true,
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: 'Service Amount',
      dataIndex: 'serviceamount',
      width: '15%',
      editable: true,
      render: (value: number) => `₹${value.toLocaleString()}`,
    },
    {
      title: 'Points',
      dataIndex: 'points',
      width: '15%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_: any, record: CustomerData) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="primary"
              onClick={() => save(record.id!)}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
          <Button
            type="link"
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: CustomerData) => ({
        record,
        inputType: col.dataIndex === 'servicetype'
          ? 'select'
          : col.dataIndex === 'serviceamount' || col.dataIndex === 'points'
          ? 'number'
          : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <PageContainer>
      <ContentContainer>
        <Title>Customer Points Management</Title>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={addNewRow}
            icon={<PlusOutlined />}
            disabled={editingKey !== ''}
          >
            Add New Customer
          </Button>
        </ButtonContainer>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} customers`,
            }}
          />
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};

export default EmployeeDM;
