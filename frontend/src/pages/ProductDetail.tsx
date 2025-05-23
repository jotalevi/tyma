import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div style={{ 
      height: "calc(100% - 300px)", 
      width: "70%",
      margin: "auto",
      marginTop: "100px",
      backgroundColor: "white",
      borderRadius: "14px",
      boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.5)",
       }}>
      aaa
    </div>
  );
}
