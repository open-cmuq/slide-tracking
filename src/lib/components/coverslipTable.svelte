<script>
    export let coverslips;
    
    function formatDate(dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const date = new Date(dateString);
      return  date.toLocaleTimeString("en-US", options);
  }
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Coating</th>
      <th>Specimen</th>
      <th>Created At</th>
      <th>Updated At</th>
    </tr>
  </thead>
  <tbody>
    {#each coverslips as coverslip, index}
      <tr>
        <td>{index + 1}</td>
        <td>{coverslip.coating}</td>
        <td>{coverslip.specimen}</td>
        <td>{formatDate(coverslip.createdAt)}</td>
        <td>{formatDate(coverslip.updatedAt)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
  }
  thead tr {
    background-color: #f5f5f5; 
    color: black; 
  }
</style>