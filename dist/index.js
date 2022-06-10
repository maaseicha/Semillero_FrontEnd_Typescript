"use strict";
const IVA = 0.12;
const newUID = () => Math.random().toString(36).slice(2);
class Factura {
    constructor(num_factura, fecha, nombre_des = 'final', productos = []) {
        this.num_factura = num_factura;
        this.fecha = fecha;
        this.nombre_des = nombre_des;
        this.productos = productos;
    }
    agregarProductos(producto) {
        var _a;
        let bandera = true;
        if (this.productos.length > 0) {
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].nombre == producto.nombre) {
                    this.productos[i].cantidad += producto.cantidad;
                    this.productos[i].precioTotal = this.productos[i].cantidad * this.productos[i].precio;
                    bandera = false;
                }
            }
        }
        if (bandera) {
            producto.precioTotal = producto.precio * producto.cantidad;
            (_a = this.productos) === null || _a === void 0 ? void 0 : _a.push(producto);
        }
        console.log(`Producto agregado: ${producto.nombre} - Cantidad: ${producto.cantidad}`);
    }
    mostrarFactura() {
        let c_items = 0;
        let subtotal = 0;
        let iva_sub = 0;
        let total = 0;
        console.log('----------------------------------------------------------------');
        console.log(`#Factura: ${this.num_factura}                          Fecha: ${this.fecha}`);
        console.log(`Nombre: ${this.nombre_des}`);
        console.log(' ');
        console.log('Cantidad           Descripcion         Precio Unitario     Valor');
        this.productos.forEach(product => {
            c_items += product.cantidad;
            subtotal += product.precioTotal;
            console.log(`${product.cantidad}                ${product.nombre}                      ${product.precio}           ${product.precioTotal}`);
        });
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
        iva_sub = Math.round(((IVA * subtotal) + Number.EPSILON) * 100) / 100;
        total = iva_sub + subtotal;
        console.log('-------                                         ----------------');
        console.log(`${c_items}                                              SubTotal: ${subtotal}`);
        console.log(`                                                IVA:      ${iva_sub}`);
        console.log(`                                                Total:    ${total}`);
        console.log(' ');
        console.log('                    Gracias por su compra');
        console.log('                       Vuelva pronto!!');
    }
}
let fac = new Factura("0010010001", "09-06-2022", "Marco Aseicha");
const p1 = {
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 2,
    precioTotal: 0
};
const p2 = {
    codigo: newUID(),
    nombre: "Queso",
    precio: 1.20,
    cantidad: 5,
    precioTotal: 0
};
const p3 = {
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 5,
    precioTotal: 0
};
const p4 = {
    codigo: newUID(),
    nombre: "Arroz",
    precio: 0.50,
    cantidad: 8,
    precioTotal: 0
};
fac.agregarProductos(p1);
fac.agregarProductos(p2);
fac.agregarProductos(p3);
fac.agregarProductos(p4);
fac.mostrarFactura();
