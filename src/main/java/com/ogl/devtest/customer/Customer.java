package com.ogl.devtest.customer;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Name must not be empty. every customer needs a name for identification
    @NotEmpty(message = "Customer name is required")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    // Street is optional but limited to 255 chars to match database schema    
    @Size(max = 255, message = "Street must not exceed 255 characters")
    private String street;

    // City is optional but limited to 100 chars for reasonable city name length. Maybe some Indonesian cities...
    @Size(max = 100, message = "City must not exceed 100 characters")
    private String city;

    // County is optional but limited to 100 chars for reasonable county name length
    @Size(max = 100, message = "County must not exceed 100 characters")
    private String county;

    // Postcode validation:
    // - Optional (some international addresses may not have standard postcodes)
    // - Max 10 chars to accommodate various international formats (UK: 8, US: 10 with dash)
    // - Pattern allows alphanumeric with spaces and hyphens for flexibility across formats
    //   Examples: "M1 1AE" (UK), "90210" (US), "SW1A 1AA" (UK), "10001-1234" (US ZIP+4)
    @Size(max = 10, message = "Postcode must not exceed 10 characters")
    @Pattern(regexp = "^[A-Za-z0-9\\s-]*$", 
             message = "Postcode can only contain letters, numbers, spaces, and hyphens")
    private String postcode;

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }
}