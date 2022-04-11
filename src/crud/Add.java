package crud;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		doGet(request, response);
		try {
			Connection conn=db_connection.cc();
			pojo run=new Gson().fromJson(request.getReader(),pojo.class);
//			String query="INSERT INTO winter_internship business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			String query=("INSERT INTO winter_internship (business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) values(?, ?,?, ?,?, ? , ?, ? , ?, ?,?, ?,?, ?,?)");
			PreparedStatement pre_st=conn.prepareStatement(query);
			
			pre_st.setString(1,run.getBusiness_code());
			pre_st.setString(2,run.getCust_number());
			pre_st.setString(3,run.getClear_date());
			pre_st.setString(4,run.getBuisness_year());
			pre_st.setString(5,run.getDoc_id());
			pre_st.setString(6,run.getPosting_date());
			pre_st.setString(7,run.getDocument_create_date());
			pre_st.setString(8,run.getDue_in_date());
			pre_st.setString(9,run.getInvoice_currency());
			pre_st.setString(10,run.getDocument_type());
			pre_st.setString(11,run.getPosting_id());
			pre_st.setString(12,run.getTotal_open_amount());
			pre_st.setString(13,run.getBaseline_create_date());
			pre_st.setString(14,run.getCust_payment_terms());
			pre_st.setString(15,run.getInvoice_id());
			
			pre_st.execute();
			
			response.setContentType("application/json");
		}
		catch(Exception e) {
			System.out.println(e);
		}
	}

}
