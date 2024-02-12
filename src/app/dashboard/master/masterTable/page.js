"use client"
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        email: 'john.brown@example.com',
        contactNumber: '+1 123-456-7890',
        country: 'United States',
        status: 'Active',
        company: 'ABC Corp',
        joinDate: '2023-05-15',
    },
    {
        key: '2',
        name: 'Alice Johnson',
        age: 28,
        address: 'Los Angeles No. 5 Ocean View',
        email: 'alice.johnson@example.com',
        contactNumber: '+1 987-654-3210',
        country: 'United States',
        status: 'Inactive',
        company: 'XYZ Ltd',
        joinDate: '2022-09-20',
    },
    {
        key: '3',
        name: 'Bob Smith',
        age: 35,
        address: 'Chicago No. 10 Mountain Street',
        email: 'bob.smith@example.com',
        contactNumber: '+1 555-123-4567',
        country: 'United States',
        status: 'Active',
        company: 'DEF Inc',
        joinDate: '2024-01-10',
    },
    {
        key: '4',
        name: 'Emily Davis',
        age: 30,
        address: 'San Francisco No. 7 River Road',
        email: 'emily.davis@example.com',
        contactNumber: '+1 444-567-8901',
        country: 'United States',
        status: 'Active',
        company: 'GHI Corporation',
        joinDate: '2023-08-02',
    },
    {
        key: '5',
        name: 'Daniel White',
        age: 28,
        address: 'Miami No. 15 Palm Avenue',
        email: 'daniel.white@example.com',
        contactNumber: '+1 333-789-0123',
        country: 'United States',
        status: 'Inactive',
        company: 'JKL Limited',
        joinDate: '2022-11-25',
    },
    {
        key: '6',
        name: 'Sophia Turner',
        age: 29,
        address: 'Seattle No. 20 Harbor View',
        email: 'sophia.turner@example.com',
        contactNumber: '+1 777-234-5678',
        country: 'United States',
        status: 'Active',
        company: 'MNO Innovations',
        joinDate: '2023-04-18',
    },
    {
        key: '7',
        name: 'Michael Rodriguez',
        age: 34,
        address: 'Dallas No. 12 Sunset Boulevard',
        email: 'michael.rodriguez@example.com',
        contactNumber: '+1 999-876-5432',
        country: 'United States',
        status: 'Inactive',
        company: 'PQR Solutions',
        joinDate: '2022-12-05',
    },
    {
        key: '8',
        name: 'Olivia Green',
        age: 27,
        address: 'Denver No. 8 Meadow Lane',
        email: 'olivia.green@example.com',
        contactNumber: '+1 222-345-6789',
        country: 'United States',
        status: 'Active',
        company: 'STU Enterprises',
        joinDate: '2023-07-22',
    },
    {
        key: '9',
        name: 'Ethan Taylor',
        age: 31,
        address: 'Phoenix No. 18 Hillside Drive',
        email: 'ethan.taylor@example.com',
        contactNumber: '+1 111-789-0123',
        country: 'United States',
        status: 'Active',
        company: 'VWX Innovations',
        joinDate: '2023-02-09',
    },
    {
        key: '10',
        name: 'Ava Martinez',
        age: 26,
        address: 'Houston No. 25 Garden Street',
        email: 'ava.martinez@example.com',
        contactNumber: '+1 444-567-8901',
        country: 'United States',
        status: 'Inactive',
        company: 'YZ Corporation',
        joinDate: '2022-10-15',
    },
    {
        key: '11',
        name: 'Logan Harris',
        age: 33,
        address: 'Atlanta No. 14 Maple Avenue',
        email: 'logan.harris@example.com',
        contactNumber: '+1 555-987-6543',
        country: 'United States',
        status: 'Active',
        company: 'ABC Ltd',
        joinDate: '2023-11-30',
    },
    {
        key: '12',
        name: 'Mia Jackson',
        age: 28,
        address: 'Orlando No. 9 Pine Street',
        email: 'mia.jackson@example.com',
        contactNumber: '+1 666-876-5432',
        country: 'United States',
        status: 'Inactive',
        company: 'XYZ Solutions',
        joinDate: '2022-08-08',
    },
    {
        key: '13',
        name: 'Noah Adams',
        age: 29,
        address: 'San Diego No. 22 Ocean Drive',
        email: 'noah.adams@example.com',
        contactNumber: '+1 777-234-5678',
        country: 'United States',
        status: 'Active',
        company: 'DEF Innovations',
        joinDate: '2023-05-01',
    },
    {
        key: '14',
        name: 'Ella Collins',
        age: 30,
        address: 'Tampa No. 7 Palm Street',
        email: 'ella.collins@example.com',
        contactNumber: '+1 888-345-6789',
        country: 'United States',
        status: 'Active',
        company: 'GHI Enterprises',
        joinDate: '2023-08-17',
    },
    {
        key: '15',
        name: 'Liam Stewart',
        age: 32,
        address: 'New Orleans No. 16 Riverfront Road',
        email: 'liam.stewart@example.com',
        contactNumber: '+1 333-789-0123',
        country: 'United States',
        status: 'Inactive',
        company: 'JKL Corporation',
        joinDate: '2022-11-10',
    },
    {
        key: '16',
        name: 'Mia Harrison',
        age: 27,
        address: 'Orlando No. 3 Cedar Street',
        email: 'mia.harrison@example.com',
        contactNumber: '+1 999-888-7777',
        country: 'United States',
        status: 'Active',
        company: 'Zeta Enterprises',
        joinDate: '2023-07-12',
    },
    {
        key: '17',
        name: 'James Foster',
        age: 32,
        address: 'Nashville No. 5 Birch Lane',
        email: 'james.foster@example.com',
        contactNumber: '+1 777-666-5555',
        country: 'United States',
        status: 'Inactive',
        company: 'Eta Solutions',
        joinDate: '2022-08-30',
    },
    {
        key: '18',
        name: 'Ella Rivera',
        age: 29,
        address: 'Portland No. 8 Pine Road',
        email: 'ella.rivera@example.com',
        contactNumber: '+1 222-111-0000',
        country: 'United States',
        status: 'Active',
        company: 'Theta Innovations',
        joinDate: '2023-04-05',
    },
    {
        key: '19',
        name: 'Ethan Coleman',
        age: 30,
        address: 'Minneapolis No. 6 Cedar Avenue',
        email: 'ethan.coleman@example.com',
        contactNumber: '+1 666-777-8888',
        country: 'United States',
        status: 'Active',
        company: 'Iota Enterprises',
        joinDate: '2023-10-22',
    },
    {
        key: '20',
        name: 'Aria Simmons',
        age: 28,
        address: 'Austin No. 11 Oak Street',
        email: 'aria.simmons@example.com',
        contactNumber: '+1 555-444-3333',
        country: 'United States',
        status: 'Inactive',
        company: 'Kappa Solutions',
        joinDate: '2022-12-18',
    },
    {
        key: '21',
        name: 'William Wright',
        age: 33,
        address: 'Philadelphia No. 10 Elm Avenue',
        email: 'william.wright@example.com',
        contactNumber: '+1 444-333-2222',
        country: 'United States',
        status: 'Inactive',
        company: 'Epsilon Innovations',
        joinDate: '2022-11-01',
    }

]
const MasterTable = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 300);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const sharedOnCell = (_) => {
        return {
            colSpan: 0,
        };

    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            // fixed: 'left',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            width: 300,
            ...getColumnSearchProps('contactNumber'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
            onCell: sharedOnCell,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 300,
            ...getColumnSearchProps('country'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 300,
            ...getColumnSearchProps('status'),
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            width: 300,
            ...getColumnSearchProps('company'),
        },
        {
            title: 'Join Date',
            dataIndex: 'joinDate',
            key: 'joinDate',
            width: 300,
            ...getColumnSearchProps('joinDate'),
            sorter: (a, b) => a.joinDate.length - b.joinDate.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: 300,
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];

    return <Table
        columns={columns}
        dataSource={data}
        scroll={{
            // x: 1500,
            y: 300,
        }}
        bordered
    />;
};
export default MasterTable;