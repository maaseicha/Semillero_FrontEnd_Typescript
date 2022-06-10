const IVA = 0.12;
const newUID = (): string => Math.random().toString(36).slice(2)

interface IProducto{
    codigo:String;
    nombre:String;
    precio:number;
}

interface IProductoFactura extends IProducto{
    cantidad:number;
    precioTotal:number;
}

class Factura {
    constructor(public num_factura:String, public fecha:String, public nombre_des:String='usuario final', public productos:IProductoFactura[]=[]) {}
    
    public agregarProductos(producto:IProductoFactura): void{
        let bandera:boolean = true;
        if(this.productos.length > 0){
            for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].nombre == producto.nombre) {
                    this.productos[i].cantidad +=producto.cantidad;
                    this.productos[i].precioTotal = this.productos[i].cantidad * this.productos[i].precio;
                    bandera = false;
                }                
            }
        }
        if (bandera) {
            producto.precioTotal = producto.precio * producto.cantidad;
            this.productos?.push(producto);
        }
        console.log(`Producto agregado: ${producto.nombre} - Cantidad: ${producto.cantidad}`);
    }

    public mostrarFactura(): void{
        let c_items:number = 0;
        let subtotal:number = 0;
        let iva_sub = 0;
        let total:number = 0;
        console.log('----------------------------------------------------------------');
        console.log(`#Factura: ${this.num_factura}                          Fecha: ${this.fecha}`);
        console.log(`Nombre: ${this.nombre_des}`);
        console.log(' ');
        console.log('Cantidad           Descripcion         Precio Unitario     Valor');
        this.productos.forEach(product => {
            c_items+=product.cantidad;
            subtotal += product.precioTotal;
            console.log(`${product.cantidad}                ${product.nombre}                      ${product.precio}           ${product.precioTotal}`);
        });
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100; 
        iva_sub = Math.round(((IVA*subtotal) + Number.EPSILON) * 100) / 100;
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

let fac = new Factura("0010010001","09-06-2022","Marco Aseicha");
const p1:IProductoFactura ={
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 2,
    precioTotal:0
}
const p2:IProductoFactura ={
    codigo: newUID(),
    nombre: "Queso",
    precio: 1.20,
    cantidad: 5,
    precioTotal:0
} 
const p3:IProductoFactura ={
    codigo: newUID(),
    nombre: "Leche",
    precio: 0.90,
    cantidad: 5,
    precioTotal:0
} 
const p4:IProductoFactura ={
    codigo: newUID(),
    nombre: "Arroz",
    precio: 0.50,
    cantidad: 8,
    precioTotal:0
} 
fac.agregarProductos(p1);
fac.agregarProductos(p2);
fac.agregarProductos(p3);
fac.agregarProductos(p4);
fac.mostrarFactura();

