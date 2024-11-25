import ProductList from "./ProductList";
import "./Products.css";

const cardsData = [
  { image: "image1.png", text: "Card 1", label: "Label 1" },
  { image: "image2.png", text: "Card 2", label: "Label 2" },
  { image: "vite.svg", text: "Card 3", label: "Label 3" },
  { image: "image1.png", text: "Card 1", label: "Label 1" },
  { image: "image2.png", text: "Card 2", label: "Label 2" },
  // Add more items as needed
];
const cardsData1 = [
  { image: "Whey.png", text: "Whey Protein", label: "Label 1" },
  { image: "gants 1.png", text: "Gloves", label: "Label 2" },
  { image: "vite.svg", text: "Card c", label: "Label 3" },
  { image: "image1.png", text: "Card 1", label: "Label 1" },
  { image: "image2.png", text: "Card 2", label: "Label 2" },
  // Add more items as needed
];

function Products() {
  return (
    <div className="Products">
      <ProductList cardsData={cardsData} title="Product List 1" />
      <ProductList cardsData={cardsData1} title="Product List 2" />
    </div>
  );
}

export default Products;
