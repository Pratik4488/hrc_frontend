package crud;


import java.sql.DriverManager;
import java.sql.Connection;

public class db_connection {
	static Connection conn;
	public static Connection cc() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			String user="root";
			String password="Pratik@4488";
			String url="jdbc:mysql://localhost:3306/grey_goose";
			
			conn=DriverManager.getConnection(url,user, password);
		}
		catch(Exception e) {
			System.out.println(e);
		}
		return conn;
	}
}
