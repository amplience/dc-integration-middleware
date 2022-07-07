// Generated by https://quicktype.io
import Moltin, { PriceBook, PriceBookPriceBase } from "@moltin/sdk"
import { Category } from "../../../common";

export interface EPCustomerGroup {
    id:            string;
    type:          string;
    "group-name":  string;
    meta:          Meta;
    links:         Links;
    relationships: Relationships;
}

export interface Links {
    self: string;
}

export interface Meta {
    timestamps: Timestamps;
}

export interface Timestamps {
    created_at: string;
    updated_at: string;
}

export interface Relationships {
    "assigned-customers": AssignedCustomers;
}

export interface AssignedCustomers {
    data: null;
}

export interface AttributedProduct extends Moltin.Product {
    id: string
    attributes: any
}

export interface NodeLocator {
    hierarchyId: string
    nodeId: string
}

export interface ElasticPathCategory extends Category {
    hierarchyId: string
}

export interface PriceBookPrice extends PriceBookPriceBase {
    pricebook: PriceBook
}
