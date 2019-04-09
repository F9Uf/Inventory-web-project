var orders = [
    {
        id: "ORDER-0001",
        employeeIdCreate: "emp-00001",
        date: "12/03/45",
        employeeIdConfirm: "",
        orderDetail: [
            {
                orderDetailId: "ODD-0001",
                itemId: "ITM-920056",
                number: 12
            },
            {
                orderDetailId: "ODD-0002",
                itemId: "ITM-041234",
                number: 12
            },
            {
                orderDetailId: "ODD-0003",
                itemId: "ITM-120056",
                number: 182
            }
        ]
    }
]

exports.getOrder = (req, res) => {
    return res.status(200).json({
        success: true,
        result: orders
    });
}