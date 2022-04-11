package crud;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Advsearch
 */
@WebServlet("/Advsearch")
public class Advsearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Advsearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		try {
			Connection conn=db_connection.cc();
			Statement st=conn.createStatement();
			String doc_id = request.getParameter("doc_id");
			String invoice_id = request.getParameter("invoice_id");
			String cust_number = request.getParameter("cust_number");
			String buisness_year = request.getParameter("buisness_year");
			String query="SELECT * FROM winter_internship where doc_id='"+doc_id+"' and invoice_id='"+invoice_id+"' and cust_number='"+cust_number+"' and buisness_year='"+buisness_year+"';";
			ResultSet rs=st.executeQuery(query);
			ArrayList<pojo> fetcheddata= new ArrayList<pojo>();
			
			while(rs.next()) {
				pojo take=new pojo();
				take.setSl_no(rs.getString("sl_no"));
				take.setBusiness_code(rs.getString("business_code"));
				take.setCust_number(rs.getString("cust_number"));
				take.setClear_date(rs.getString("clear_date"));
				take.setBuisness_year(rs.getString("buisness_year"));
				take.setDoc_id(rs.getString("doc_id"));
				take.setPosting_date(rs.getString("posting_date"));
				take.setDocument_create_date(rs.getString("Document_create_date"));
				take.setDocument_create_date1(rs.getString("document_create_date1"));
				take.setDue_in_date(rs.getString("due_in_date"));
				take.setInvoice_currency(rs.getString("invoice_currency"));
				take.setDocument_type(rs.getString("document_type"));
				take.setPosting_id(rs.getString("posting_id"));
				take.setArea_business(rs.getString("area_business"));
				take.setTotal_open_amount(rs.getString("total_open_amount"));
				take.setBaseline_create_date(rs.getString("baseline_create_date"));
				take.setCust_payment_terms(rs.getString("cust_payment_terms"));
				take.setInvoice_id(rs.getString("invoice_id"));
				take.setIsOpen(rs.getString("isOpen"));
				take.setAging_bucket(rs.getString("aging_bucket"));
				fetcheddata.add(take);
			}
			
			
			String rJ=new Gson().toJson(fetcheddata);
			response.setContentType("application/json");
			response.getWriter().write(rJ);
		}
		catch(Exception e) {
			System.out.println(e);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);

		
	}

}
