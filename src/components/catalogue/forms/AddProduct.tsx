import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2Icon, X } from "lucide-react"; // Import delete icon
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProductMutation,
  useFetchBrandListQuery,
  useFetchCategoryListQuery,
} from "@/state/features/products/productApi";
import { Checkbox } from "@/components/ui/checkbox";
import { toasty } from "@/components/toaster";

// Define schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Product name too short" }),
  price: z.string().min(1, { message: "Price is required" }),
  brand: z.string().min(2, { message: "Brand name too short" }),
  category: z.string().min(2, { message: "Category name too short" }),
  description: z.string().min(2, { message: "Description too short" }),
  images: z
    .array(z.instanceof(File))
    .min(1, { message: "At least one image required" }),
  stocked: z.boolean(),
});

const AddProduct = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  const { data: brands } = useFetchBrandListQuery(null);
  const { data: categories } = useFetchCategoryListQuery(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "",
      images: [],
      stocked: false,
    },
  });

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      setSelectedImages((prev) => [...prev, ...selectedFiles]); // Add new files to state
      form.setValue("images", [...selectedImages, ...selectedFiles]); // Update form data

      // Preview images
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  // Remove image before submission
  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setSelectedImages(updatedImages);
    setImagePreviews(updatedPreviews);
    form.setValue("images", updatedImages); // Update form data
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("stocked", values.stocked ? "true" : "false");

      // Append images (Array of Files)
      values.images.forEach((file) => {
        formData.append("images", file); // Django expects an array of files
      });

      const response = await addProduct(formData).unwrap();
      console.log(response, "response");
      toasty("Product add request was successful", "success");
      form.reset();
    } catch (error) {
      console.log(error);
      toasty("There was a problem with this request", "error");
    }
  }

  return (
    <div className="base-w bg-white p-3 mt-6 rounded">
      <h3 className="text-center font-bold text-xl my-2">Add a new product</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Brand Dropdown */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands?.map((brand) => (
                          <SelectItem key={brand.id} value={brand.name}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Dropdown */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Stocked Checkbox */}
            <FormField
              control={form.control}
              name="stocked"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>In Stock</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>

          {/* Image Previews with Remove Button */}
          <div className="flex flex-wrap gap-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={src}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <Button
            className="w-full flex place-items-center bg-blue-500 hover:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            <span>Submit</span>

            {isLoading && <Loader2Icon className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
