import { useGetProductsQuery } from '@/api/product';
import { Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { data } = useGetProductsQuery();
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800">Trang chủ  🏠</h2>
            </div>
            {!data ? (
                <Skeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    {data?.map((item) => (
                        <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                        >
                            <Card hoverable className="mb-4" >
                                <div className="flex justify-center">
                                    <img alt="example" className="w-1/3" src={item.image} />
                                </div>
                                <Meta className="text-center mt-3" title={item.name} />
                                <br />
                                <Meta className="text-center mt-3" description={`Price: ${item.price}`} />
                                <br />
                                <Meta className="text-center mt-3" description={`Mô tả sản phẩm : ${item.description}`} />
                            </Card>
                        </Link>

                    ))}
                </div>
            )}

        </div>
    );
};

export default HomePage;
