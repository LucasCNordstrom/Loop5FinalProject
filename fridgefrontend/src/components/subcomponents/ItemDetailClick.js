

export default function ItemDetailClick() {

  return (
    <Form.Group> 
    <p> Sort by: </p>
    <Form.Select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
      <option value="expirationDate">Expiration Date</option>
      <option value="expirationDateRev">Expiration Date Descending</option>
      <option value="alphabetical">Alphabetically</option>
      <option value="alphabeticalRev">Alphabetically Descending</option>
      <option value="quantity">Amount</option>
      <option value="quantityRev">Amount Descending</option>
    </Form.Select>
  </Form.Group>
  )
}
