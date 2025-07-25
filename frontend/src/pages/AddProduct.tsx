/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent, type FormEvent } from "react"
import Layout from "../components/Layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const AddProduct = () => {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [image1, setImage1] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleImageChange=(e: ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files?.[0]) {
            setImage1(e.target.files[0]);
        }
    }
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        if (!name || !type || !sku) {
            alert("Name, Type and SKU are required");
            return;
        }
        if(!image1){
            alert("Image is required");
            return;
        }
        if(!price){
            alert("Price is required");
            return;
        }
        if(!quantity || !Number.isInteger(quantity)){
            alert("Enter vaild quantity");
            return;
        }
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("sku", sku);
            formData.append("description", description);
            formData.append("quantity", quantity.toString());
            formData.append("price", price.toString());
            formData.append("image1", image1);
            await axios.post("/api/products", formData);
            alert("Product added!");
            setName("");
            setType("");
            setSku("");
            setDescription("");
            setQuantity(0);
            setPrice(0);
            setImage1(null);
        } catch (error:any) {
            alert(error.response?.data.message ?? error.message);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Layout>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2}} >

        <Typography variant="h5" align="center">
          Add New Product
        </Typography>

        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required/>

        <TextField label="Type" value={type} onChange={e => setType(e.target.value)} required/>
          
        <TextField label="SKU" value={sku} onChange={e => setSku(e.target.value)} required />

        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows={4}/>

        <TextField label="Quantity" type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />

        <TextField label="Price" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />

        <Button variant="contained" component="label">
          {image1 ? "Change Image" : "Upload Image"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {image1 && <Typography variant="body2">{image1.name}</Typography>}

        <Button type="submit" variant="contained" disabled={submitting}>
          {submitting ? "Saving..." : "Add Product"}
        </Button>
      </Box>
    </Layout>
  )
}

export default AddProduct