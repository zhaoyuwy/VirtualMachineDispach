package com.huawei.siteapp.tools;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by z00390414 on 2017/7/6.
 *
 * @version 1.0
 */
public class FastJsonTest
{
    @Test
    public void testJson1(){
        Student student = new Student(0, "Aaron", 24);
        SimplePropertyPreFilter filter = new SimplePropertyPreFilter(Student.class, "id","age");
        String jsonStu =JSON.toJSONString(student,filter);
        System.out.println(JSON.toJSONString(student,true));
        System.out.println(student.toString());
        System.out.println(jsonStu);
    }
    @Test
    public void testJson2(){
        List<Student> students = new ArrayList<Student>();
        for(int i=0;i<5;i++) {
            Student stu = new Student(i, "Student" + i, 18 +i);
            students.add(stu);
        }
        System.out.println(JSON.toJSONString(students));
    }
    @Test
    public void testJson3(){
        List<Teacher> teaList = new ArrayList<Teacher>();
        long time = System.currentTimeMillis();
        for(int i=0;i<10;i++) {
            Teacher teacher = new Teacher(i, "Teacher " + i);
            List<Student> stus = new ArrayList<Student>();
            for(int j = 0 ;j<4;j++) {
                Student s = new Student(j, "Student" + j, 18 +j);
                stus.add(s);
            }
            teacher.setStudents(stus);
            teaList.add(teacher);
        }
        String jsonTeach = JSON.toJSONString(teaList);
        System.out.println("fastjson = " + jsonTeach);
    }
    @Test
    public void testJson4(){
        Student student = new Student(0, "Aaron", 24);
        String str = JSON.toJSONString(student,true);
        Student student1 = JSON.parseObject(str,Student.class);
        System.out.println(JSON.parseObject(str,Student.class));
        Student a = new Student();
        a = student1;
        a.setAge(90);
        System.out.println(str);
    }
}
