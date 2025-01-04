import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table, Input, Button, Space, Select, Form, InputNumber, message, Popconfirm } from 'antd';
import { PlusOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
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
  isNew?: boolean;
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
    fetchCustomerPoints();
  }, []);

  const fetchCustomerPoints = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customer_points')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setData(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customer_points')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      message.success('Record deleted successfully');
      fetchCustomerPoints(); // Refresh the data
    } catch (error) {
      console.error('Error deleting record:', error);
      message.error('Failed to delete record');
    }
  };

  const isEditing = (record: CustomerData) => record.id === editingKey;

  const handleAdd = () => {
    const newId = `temp-${Date.now()}`;  // Temporary ID for new row
    const newData: CustomerData = {
      id: newId,
      name: '',
      customerid: '',
      servicetype: 'loans',
      serviceamount: 0,
      points: 0,
      isNew: true  // Flag to identify new rows
    };
    setData([newData, ...data]);
    setEditingKey(newId);
    form.setFieldsValue(newData);
  };

  const cancel = () => {
    // Remove temporary row if canceling a new addition
    if (editingKey.startsWith('temp-')) {
      setData(data.filter(item => !item.id.toString().startsWith('temp-')));
    }
    setEditingKey('');
    form.resetFields();
  };

  const save = async (id: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      
      if (index > -1) {
        const item = newData[index];
        
        // Check if this is a new record
        if (item.isNew) {
          // Remove temporary ID and isNew flag before sending to Supabase
          const { id: tempId, isNew, ...dataToInsert } = row;
          
          const { data: newRecord, error } = await supabase
            .from('customer_points')
            .insert([dataToInsert])
            .select();

          if (error) throw error;
          
          if (newRecord && newRecord[0]) {
            newData.splice(index, 1, { ...newRecord[0] });
            setData(newData);
            message.success('New customer added successfully');
          }
        } else {
          // Handle existing record update
          const { error } = await supabase
            .from('customer_points')
            .update(row)
            .eq('id', id);

          if (error) throw error;
          
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          message.success('Customer information updated successfully');
        }
        
        setEditingKey('');
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
      message.error('Failed to save changes');
    }
  };

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
      width: '20%',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerid',
      editable: true,
      width: '20%',
    },
    {
      title: 'Service Type',
      dataIndex: 'servicetype',
      editable: true,
      width: '15%',
      render: (_: any, record: CustomerData) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="servicetype"
            style={{ margin: 0 }}
            rules={[{ required: true, message: 'Please select service type!' }]}
          >
            <Select>
              <Option value="loans">Loans</Option>
              <Option value="insurance">Insurance</Option>
              <Option value="credit_cards">Credit Cards</Option>
            </Select>
          </Form.Item>
        ) : (
          record.servicetype
        );
      },
    },
    {
      title: 'Service Amount',
      dataIndex: 'serviceamount',
      editable: true,
      width: '15%',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      editable: true,
      width: '15%',
    },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (_: any, record: CustomerData) => {
        const editable = isEditing(record);
        return (
          <Space>
            {editable ? (
              <>
                <Button
                  type="primary"
                  onClick={() => save(record.id!)}
                  icon={<SaveOutlined />}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button onClick={cancel}>Cancel</Button>
              </>
            ) : (
              <>
                <Button
                  disabled={editingKey !== ''}
                  onClick={() => edit(record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this record?"
                  onConfirm={() => handleDelete(record.id!)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    disabled={editingKey !== ''}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
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
            onClick={handleAdd}
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
