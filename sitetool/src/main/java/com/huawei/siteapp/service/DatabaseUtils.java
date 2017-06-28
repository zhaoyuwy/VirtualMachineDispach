//package com.huawei.siteapp.service;
//
//import com.huawei.siteapp.common.util.CommonUtils;
//import com.huawei.siteapp.common.util.PropertiesUtils;
//import org.apache.commons.dbcp2.BasicDataSource;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.io.*;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.concurrent.locks.Lock;
//import java.util.concurrent.locks.ReentrantLock;
//
//import static org.springframework.jdbc.support.JdbcUtils.closeConnection;
//
///**
// * Created by z00390414 on 2017/6/26.
// *
// * @version 1.0
// */
//public class DatabaseUtils {
//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//    private static final int ZERO = 0;
//    private BasicDataSource dataSource;
//    private Lock lock = new ReentrantLock();
//
//    private Connection getConnection() throws Exception {
//        try {
//            return dataSource.getConnection();
//        } catch (Exception e) {
//            throw new Exception("get connection error", e);
//        }
//    }
//
//
//    private boolean importSql()
//            throws Exception {
//        logger.info("will to import sql file: ");
//        BufferedReader reader = null;
//        try {
//            ClassLoader classloader = PropertiesUtils.class.getClassLoader();
//            InputStream in = null;
//            if (classloader != null) {
//                in = classloader.getResourceAsStream(PropertiesUtils.get("sql.file"));
//            }
//            if (in == null) {
//                return false;
//            }
//            reader = new BufferedReader(new InputStreamReader(in, "GBK"));
//            StringBuilder sb = new StringBuilder();
//
//            boolean beginFound = false;
//
//            for (String tmp; null != (tmp = reader.readLine()); ) {
//
//                sb.append(tmp).append(" ");
//
//                tmp = tmp.trim();
//                if ("begin".equalsIgnoreCase(tmp)) {
//                    beginFound = true;
//                }
//
//                if (beginFound && !tmp.startsWith("end") && !tmp.startsWith("END")) {
//                    continue;
//                }
//
//                if (beginFound) {
//                    beginFound = false;
//                }
//
//                if (tmp.endsWith(";")) {
//                    executeSql(sb.toString());
//                    sb.delete(ZERO, sb.length());
//                }
//
//            }
//            return true;
//        } catch (FileNotFoundException e) {
//            throw new Exception("init sql not found error.");
//        } catch (IOException e) {
//            throw new Exception("", e);
//        } finally {
//            if (null != reader) {
//                try {
//                    reader.close();
//                } catch (IOException e) {
//                    throw new Exception("", e);
//                }
//            }
//        }
//
//    }
//
//    private void setAutoCommit(Connection con, boolean autoCommit)
//            throws Exception {
//        try {
//            con.setAutoCommit(false);
//        } catch (SQLException e) {
//            closeConnection(con);
//            throw new Exception("", e);
//        }
//    }
//
//    private PreparedStatement getPreparedStatemnet(Connection con, String sql)
//            throws Exception {
//        if (null == con) {
//            return null;
//        }
//
//        try {
//            return con.prepareStatement(sql);
//        } catch (SQLException e) {
//            closeConnection(con);
//            throw new Exception("", e);
//        }
//    }
//
//    private void setPstArgs(PreparedStatement pst, Collection<Object> args)
//            throws SQLException {
//        if (null != args) {
//            int i = ZERO;
//            for (Object obj : args) {
//                ++i;
//                pst.setObject(i, obj);
//            }
//        }
//    }
//
//    private void setPstArgs(PreparedStatement pst, Object... args)
//            throws SQLException {
//        int i = ZERO;
//        for (Object obj : args) {
//            pst.setObject(++i, obj);
//        }
//    }
//
//    private List<Object> setPstArgsToList(Object... args) {
//        List<Object> param = new ArrayList<Object>();
//        {
//            for (Object obj : args) {
//                param.add(obj);
//            }
//        }
//        return param;
//    }
//
//    private void closePreparedStatement(PreparedStatement pst)
//            throws Exception {
//        if (null != pst) {
//            try {
//
//                pst.close();
//            } catch (SQLException e) {
//                throw new Exception("", e);
//            }
//        }
//    }
//
//    public void executeSql(String sql, Object... args)
//            throws Exception {
//        try {
//            lock.lock();
//            Connection con = getConnection();
//            if (null == con) {
//                throw new Exception("connection is null");
//            }
//            setAutoCommit(con, false);
//            PreparedStatement pst = getPreparedStatemnet(con, sql);
//
//            if (null == pst) {
//                throw new Exception("statement is null");
//
//            }
//
//            try {
//                setPstArgs(pst, args);
//
//                pst.execute();
//                con.commit();
//
//            } catch (SQLException e) {
//                throw new Exception("", e);
//            } finally {
//                closePreparedStatement(pst);
//                closeConnection(con);
//            }
//        } finally {
//            lock.unlock();
//        }
//    }
//
//    private void setJdbcUrl(String url) {
//        if (null != dataSource) {
//            dataSource.setUrl(url);
//        }
//    }
//
//    public void init()
//            throws Exception {
//        String path = PropertiesUtils.get("toolPath");
//        String dbdir = PropertiesUtils.get("database.dir");
//        if (!CommonUtils.isNull(path)) {
//            path += path.endsWith("/") ? "" : File.separator;
//        }
//        String dbPath = path + dbdir + File.separator + PropertiesUtils.get("database.file");
//        logger.info("db file path:" + dbPath);
//        File dbFile = new File(dbPath);
//        if (!dbFile.exists()) {
//            setJdbcUrl("jdbc:sqlite:" + dbPath);
//            importSql();
//
//        } else {
//            setJdbcUrl("jdbc:sqlite:" + dbPath);
//        }
//
//    }
//}
