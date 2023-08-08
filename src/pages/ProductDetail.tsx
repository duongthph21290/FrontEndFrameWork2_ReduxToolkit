import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/api/product';
import { Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';

const ProductDetailPage = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData } = useGetProductByIdQuery(idProduct || "")

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800">
                    Chi tiết sản phẩm 💦
                </h2>
            </div>
            {!productData ? (
                <Skeleton />
            ) : (
                <div className="flex justify-center">
                    <Card hoverable className="mb-4">
                        <div className="flex justify-center">
                            <img alt="example" className="w-3/3" src={productData.image} />
                        </div>
                        <Meta className="text-center mt-3" title={productData.name} />
                        <br />
                        <Meta
                            className="text-center mt-3"
                            description={`Price: ${productData.price}`}
                        />
                        <br />
                        <Meta
                            className="text-center mt-3"
                            description={`Mô tả sản phẩm : ${productData.description}`}
                        />
                    </Card>
                </div>
            )}

        </div>
    );
};

export default ProductDetailPage;
