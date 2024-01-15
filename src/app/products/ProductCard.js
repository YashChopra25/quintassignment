import Link from "next/link";
import Image from "next/image";
const ProductCard = ({ data }) => {
    let { image, title, description, price } = data;
    if (description.length > 120) {
        description = description.substring(0, 100).concat('...')
    }
    return (
        <Link href="#" className="group P-4">

            <div class="img img-contain flex justify-center items-center">
         
                <Image
                    src={image}
                    alt={title}
                    width={245}
                    height={245}
                    className="object-cover object-center group-hover:opacity-75"
                    title="yash"
                />
            
              
            </div>
            <h2 className="mt-4 text-lg font-bold text-gray-700">{title}</h2>
            <h4 className="mt-4 text-sm text-gray-700">{description}</h4>
            <p className="mt-1 text-lg font-medium text-gray-900">Rs.{price}</p>
        </Link>
    )
}
export default ProductCard;