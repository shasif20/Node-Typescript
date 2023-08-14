import "jest";
const calculateStock = require('../src/services/calculateStock');
const getStockLevel = require('../src/services/getStockLevel');

describe('calculate current stock level tests', () => {
    it('should return 8510 quantity for "LTV719449/39/39" SKU ', async () => {
        const result: { sku: string, qty: number } =  await getStockLevel('LTV719449/39/39')
        expect(result.qty).toBe(8510);
    });

    it('should subtract from total stock for transaction with type "order" ', () => {
        const result = calculateStock({ sku: 'XYZ', type: 'order', qty: 15}, 515);
        expect(result).toBe(500);
    })

    it('should add back to total stock for transaction with type "refund" ', () => {
        const result = calculateStock({ sku: 'XYZ', type: 'refund', qty: 25}, 275);
        expect(result).toBe(300);
    })
})
