// src/pages/GetProducts.tsx
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios, { AxiosError } from "axios";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Pagination, Typography, Button } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  type: string;
  sku: string;
  image_url: string;
  description: string;
  quantity: number;
  price: number;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const GetProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({page: 1, limit: 2, total: 0, pages: 1});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProducts = async (pageToFetch: number, limit: number) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get("/api/products", {params: { page: pageToFetch, limit }});
      setProducts(data.items);
      // update all pagination fields
      setPagination(data.pagination);
    } catch (err) {
      const e = err as AxiosError<{ message: string }>;
      setError(e.response?.data.message ?? e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  const handleUpdateQuantity = async (id: string, currentQty: number) => {
    const input = prompt("Enter new quantity:", String(currentQty));
    if (input === null) return;
    const newQty = parseInt(input, 10);
    if (isNaN(newQty) || newQty < 0) {
      alert("Please enter a valid non-negative integer quantity.");
      return;
    }
    try {
      await axios.put(`/api/products/${id}/quantity`, { quantity: newQty });
      // Refresh current page
      fetchProducts(pagination.page, pagination.limit);
    } catch (err) {
      const e = err as AxiosError<{ message: string }>;
      alert(e.response?.data.message ?? e.message);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Products
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>
                        {p.image_url && (
                          <img src={p.image_url} alt={p.name} style={{ height: 50, objectFit: "cover" }}/>
                        )}
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>{p.sku}</TableCell>
                      <TableCell>
                        {p.description.length > 50
                          ? p.description.slice(0, 50) + "…"
                          : p.description}
                      </TableCell>
                      <TableCell align="right">{p.quantity}</TableCell>
                      <TableCell align="right">
                        ₹{p.price}
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" size="small"
                          onClick={() => handleUpdateQuantity(p._id, p.quantity)}>
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{ display: "flex", justifyContent: "center", my: 2 }}
            >
              <Pagination 
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default GetProducts;
