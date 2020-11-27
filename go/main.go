package main

import (
	"strconv"
	"log"
	"net/http"
	"encoding/json"	

	"github.com/gorilla/mux"
)

// Type Products
type Product struct {
	ID			string `json:"id"`
	Name		string `json:"name"`
	Description	string `json:"description"`
	Price		float32 `json:"price"`
}

var products []Product

// Get all products
func getProducts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// Get a product
func getProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // Get Params

	for _, item := range products {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

	json.NewEncoder(w).Encode(&Product{})
}

// Add a product
func addProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var product Product
	_ = json.NewDecoder(r.Body).Decode(&product)
	product.ID =  strconv.Itoa(len(products) + 1)
	products = append(products, product)
	json.NewEncoder(w).Encode(product)
}

// Update a prouct
func updateProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range products {
		if item.ID == params["id"] {
			products = append(products[:index], products[index+1:]...)
			var product Product
			_ = json.NewDecoder(r.Body).Decode(&product)
			product.ID = params["id"]
			products = append(products, product)
			json.NewEncoder(w).Encode(product)
			return
		}
	}
}

// Delete a product
func deleteProduct(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range products {
		if item.ID == params["id"] {
			products = append(products[:index], products[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(products)
}

func main() {
	r := mux.NewRouter()

	// Hardcoded data
	products = append(products, Product{ID: "1", Name: "Product one", Description: "This is product one", Price: 29.99})
	products = append(products, Product{ID: "2", Name: "Product two", Description: "This is product two", Price: 59.99})
	products = append(products, Product{ID: "3", Name: "Product three", Description: "This is product three", Price: 99.99})

	//Routes / Handlers
	r.HandleFunc("/api/v1/products", getProducts).Methods("GET")
    r.HandleFunc("/api/v1/products/{id}", getProduct).Methods("GET")
    r.HandleFunc("/api/v1/products", addProduct).Methods("POST")
    r.HandleFunc("/api/v1/products/{id}", updateProduct).Methods("PUT")
	r.HandleFunc("/api/v1/products/{id}", deleteProduct).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":5002", r))

}