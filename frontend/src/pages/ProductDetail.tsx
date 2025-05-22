import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  return <h1 className="p-6 text-xl">🛒 Product Detail for ID: {id}</h1>;
}
