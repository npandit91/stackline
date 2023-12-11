type Review = {
  customer: string;
  review: string;
  score: number;
};

type SalesData = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};

type ProductDetails = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: SalesData[];
};

type ProductDetailsState = {
  loading: boolean;
  data: ProductDetails | undefined;
  error: string | null;
};

export { Review, SalesData, ProductDetails, ProductDetailsState };
