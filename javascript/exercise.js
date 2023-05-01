const results = []

const data = [
  [10, true],
  [10, false],
  [2, 6, 7, 8, 9, 100, 34, 5000, 3, 4, 6, 2, 5, 6],
  [
    { 'value': 0.5, 'equal': '0.5kg' },
    { 'value': 1, 'equal': '1kg' },
    { 'value': 2.5, 'equal': '2.5kg' },
    { 'value': 5, 'equal': '5kg' },
    { 'value': 10, 'equal': '10kg' },
    { 'value': 15, 'equal': '15kg' },
    { 'value': 20, 'equal': '20kg' },
    { 'value': 25, 'equal': '25kg' },
    { 'value': 4.53592, 'equal': '10lbs' },
    { 'value': 11.3398, 'equal': '25lbs' },
    { 'value': 15.8757, 'equal': '35lbs' },
    { 'value': 20.4117, 'equal': '45lbs' },
  ],
  [
    { size: 'S', quantity: 1 },
    { size: 'M', quantity: 18 },
    { size: 'L', quantity: 20 },
    { size: 'XL', quantity: 15 },
    { size: 'XXL', quantity: 3 },
    { size: 'XXXI', quantity: 1 }
  ],
  [
    { sizes: ['S'], quantity: 1, name: 'Ralph', },
    { sizes: ['S', 'M'], quantity: 1, name: 'George' },
    { sizes: ['L', 'XL'], quantity: 1, name: 'Helena' },
    { sizes: ['S'], quantity: 1, name: 'Jak' },
    { sizes: ['XXL'], quantity: 1, name: 'Rio' },
    { sizes: ['XXXI'], quantity: 1, name: 'Alex' }
  ],
  [
    [4, 3],
    [8, 2],
    [2, 5],
    [3, 1],
  ]
]

const translateNumber = (value, flag) => {
  if (value && flag) return value * 2
  else return Number(String(value) + 1)
}

results.push(translateNumber(...data[0]))
results.push(translateNumber(...data[1]))

const numbersArr = [2, 6, 7, 8, 9, 100, 34, 5000, 3, 4, 6, 2, 5, 6]
const findIfRepeat = (arr, toFind) => {
  const count = [...arr].reduce((acc, el) => {
    if (el === toFind) {
      return acc += 1
    }
    return acc
  }, 0)
  return {
    toFind,
    count
  }
}

results.push(findIfRepeat(data[2], 6))

const findNewRecord = (equipments, record, increase = 0) => {
  let sum = 0;
  const oneSide = ((record - 20) / 2) + increase
  const indexes = [];
  equipments = [...equipments]
    .filter(el => el.value <= oneSide)
    .sort((a, b) => b.value - a.value)
  equipments.forEach((_, i) => {
    if (sum + equipments[i].value <= oneSide) {
      sum += equipments[i].value;
      indexes.push(i)
    }
  })
  let newRecord = 20
  const disks = indexes.map(i => {
    const equipment = equipments[i]
    newRecord = newRecord + equipment.value * 2
    return equipment
  })
  if (record === newRecord || disks.length > 12)
    return findNewRecord(equipments, record, increase += 0.1)
  return {
    gripWeight: 20,
    oneSideDisks: disks,
    oneSideWeight: (newRecord - 20) / 2,
    disksQuantityOneSide: disks.length,
    oldOneSideWeight: (record - 20) / 2,
    oldRecord: record,
    newRecordTotalWeight: newRecord,
    disksQuantityBothSide: disks.length * 2,
    bothSideDisks: [...disks, ...disks]
  };
}

results.push(findNewRecord(data[3], 101))

const sizeMatcher = (store, orders) => {
  const sizes = [...store]
  const ordered = [...orders].sort((a, b) => a.sizes.length - b.sizes.length)
  const finalOrder = ordered.reduce((acc, order) => {
    const firstIndex = sizes.findIndex(el => el.size === order.sizes[0])
    let secondIndex = -1
    if (order.sizes[1]) secondIndex = sizes.findIndex(el => el.size === order.sizes[1])
    if (firstIndex >= 0) {
      const { quantity, size } = sizes[firstIndex]
      if (quantity > 0) {
        sizes[firstIndex].quantity -= 1
        acc.push({ size, quantity: 1, name: order.name })
      } else if (secondIndex === -1) {
        acc.push({ size, quantity: null, name: order.name })
      } else if (secondIndex >= 0) {
        const { quantity, size } = sizes[secondIndex]
        if (quantity > 0) {
          sizes[secondIndex].quantity -= 1
          acc.push({ size, quantity: 1, name: order.name })
        } else {
          acc.push({ size, quantity: null, name: order.name })
        }
      }
    }
    return acc
  }, [])
  return { finalOrder, oldOrder: orders, newStore: sizes, oldStore: store }
}

results.push(sizeMatcher(data[4], data[5]))


const theaterLights = (n, m, coordinates) => {
  const positions = []
  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= m; y++) {
      if (coordinates.find((el) => el[0] === x && el[1] === y)) continue
      const resultX = []
      const byCoordinateX = coordinates.find((el) => el[0] === x)
      if (byCoordinateX) {
        resultX[0] = x
        resultX[1] = y
        resultX[2] = y > byCoordinateX[1] ? 'bottom' : 'top'
      }
      const resultY = []
      const byCoordinateY = coordinates.find((el) => el[1] === y)
      if (byCoordinateY) {
        resultY[0] = x
        resultY[1] = y
        resultY[2] = x > byCoordinateY[0] ? 'left' : 'right'
      }
      if (resultX.length) positions.push(resultX)
      if (resultY.length) positions.push(resultY)
    }
  }
  return positions
}

results.push(theaterLights(8, 6, data[6]))

console.log(results)