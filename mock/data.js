export default {
  'GET /api/list': (req, res) => {
    res.send({
      code: 0,
      message: null,
      success: true,
      data: {
        list: [
          { id: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 },
          { id: 1, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 },
          { id: 2, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 },
          { id: 3, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 },
        ],
        total: 4,
        pageSize: 10,
        pageNum: 1,
      }
    });
  }
}
