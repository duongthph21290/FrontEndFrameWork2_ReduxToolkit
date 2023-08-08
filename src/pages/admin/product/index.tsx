import { Button, Popconfirm, Skeleton, Table, message, Pagination } from 'antd';
import { useGetProductsQuery, useRemoveProductMutation } from '@/api/product';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AdminProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  
  const { data, isLoading: isProductLoading } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [removeProduct] = useRemoveProductMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const dataSource = data?.map((item: any) => ({
    key: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    image: item.image,
  }));

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };



  const columns = [
    {
      title: 'Tên sản phẩm 📕',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Giá sản phẩm 💸',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Mô tả sản phẩm 🎒',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Ảnh sản phẩm 🖼',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (image: string) => (
        <div className="flex justify-center items-center">
          <img src={image} alt="OOPS 500 ảnh lỗi rồi" style={{ maxWidth: "100px" }} />
        </div>
      )

    },
    {
      title: "Hành động 🎬",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <div>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm không?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => {
              removeProduct(id).unwrap().then(() => {
                messageApi.open({
                  type: 'success',
                  content: "Xóa sản phẩm thành công"
                })
              })
            }}
          >
            <Button className="text-white bg-red-500 hover:bg-red-500 hover:text-white ">
              Xóa
            </Button>

          </Popconfirm>
          <Button type='primary' className='bg-blue-500 text-white  ml-2'>
            <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
          </Button>
        </div>
      )
    }

  ]

  return (
    <div>
      <header className='flex items-center justify-between mb-4'>
        <h2 className='font-bold text-2xl'>Quản lí sản phẩm</h2>
        <Button type='primary' className='bg-blue-500 text-white'>
          <Link to='/admin/product/add'>Thêm sản phẩm</Link>
        </Button>
      </header>
      {contextHolder}
      {isProductLoading ? (
        <Skeleton />
      ) : (
        <div>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <div className='mt-4 flex justify-center'>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.length || 0}
              onChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;