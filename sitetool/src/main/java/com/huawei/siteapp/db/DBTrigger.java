package com.huawei.siteapp.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Created by z00390414 on 2017/6/28.
 *
 * @version 1.0
 */
public class DBTrigger {
    public static void logSal (int empID, float oldSal, float newSal)
            throws SQLException
    {
        Connection conn = DriverManager.getConnection("jdbc:default:connection:");
        String sql = "INSERT INTO sal_audit VALUES (?, ?, ?)";
        try
        {
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, empID);
            pstmt.setFloat(2, oldSal);
            pstmt.setFloat(3, newSal);
            pstmt.executeUpdate();
            pstmt.close();
        }
        catch (SQLException e)
        {
            System.err.println(e.getMessage());
        }
    }
}
