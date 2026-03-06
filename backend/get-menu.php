<?php
header("Content-Type: application/json");
include 'db_config.php'; 

$sql = "SELECT * FROM menu_items";
$result = $conn->query($sql);

$menu = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $menu[] = $row;
    }
}
echo json_encode($menu); 
?>
// Copy panna link-ah inga paste pannunga
const dbURI = 'mongodb+srv://admin:cafe123@cluster0.yourlink.mongodb.net/cafe_db?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log("MongoDB Atlas Connected! ✅"))
    .catch(err => console.log("Error: ❌", err));