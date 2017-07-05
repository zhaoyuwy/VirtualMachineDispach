package com.huawei.siteapp.thread;

import com.huawei.siteapp.common.util.SpringUtil;
import com.huawei.siteapp.service.Task.AsyncTaskServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Created by Administrator on 2015-02-12.
 */
//@Configuration
//@ComponentScan(basePackages = "com.huawei.siteapp")
//@EnableScheduling
public class ThreadScheduler {

//    @Autowired
//    ApplicationContext applicationContext;

    //    管理线程的方法
//    @Scheduled(cron = "*/2 * * * * *")
    @Scheduled(fixedDelay = 2000)
    public void startExecutorThread() throws ExecutionException, InterruptedException {

        List<Object> threadList = new ArrayList<Object>();

        for (int i = 0; i < 2; i++) {
            MyThread myThread = SpringUtil.getBean("myThread", MyThread.class);
            threadList.add(myThread);
        }

        Map<Object, Future<Object>> thread_results = makeExecutorThreadPool(threadList.size(), threadList);

        returnsExcutorThread(thread_results);
    }


    //    产生一个真正的线程池线程和运行方法
    public Map<Object, Future<Object>> makeExecutorThreadPool(int size, List<Object> works) throws ExecutionException, InterruptedException {

        ExecutorService es = Executors.newFixedThreadPool(size);

        Map<Object, Future<Object>> result = new TreeMap<Object, Future<Object>>();

        for (Iterator<Object> _works = works.iterator(); _works.hasNext(); ) {
            Object _work = _works.next();

            Future<Object> future = es.submit((MyThread) _work);
//            System.out.println("hashcode : " + ((MyThread) _work).hashCode());
            //以便在分组中的@Scope MyThread的，以确保哈希码原型，即，所创建的每个对象。
            result.put(((MyThread) _work).hashCode(), future);
        }
        es.shutdown();
        return result;
    }

    /**
     * Returns excutor thread.
     *
     * @param thread_results the thread _ results
     */
//方法来检查值从呼叫接收可赎回的方法返回
    public void returnsExcutorThread(Map<Object, Future<Object>> thread_results) {
        AsyncTaskServiceImpl asyncTaskService = SpringUtil.getBean(AsyncTaskServiceImpl.class);
        for (Map.Entry<Object, Future<Object>> ret : thread_results.entrySet()) {
            try {
                Map<Object, Object> return_map = (Map<Object, Object>) ret.getValue().get();
//                asyncTaskService.asyncSaveData1();
                System.out.println("return thread result : " + return_map.get("number_list"));
            } catch (Exception e) {
                System.out.println("error : " + e);
            }
        }
    }

    public static void main(String[] args) {
//        ApplicationContext context = new ClassPathXmlApplicationContext("classpath*:/WEB-INF/mvc-dispatcher-servlet.xml");
//        ApplicationContext context = new AnnotationConfigApplicationContext(ThreadScheduler.class);

        MyThread myThread = SpringUtil.getBean("myThread", MyThread.class);
        System.out.println(myThread);
        try {
            Thread.sleep(2000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
