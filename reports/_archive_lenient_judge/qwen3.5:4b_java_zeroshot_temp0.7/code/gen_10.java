import java.util.Scanner;
import java.math.BigInteger;
public class Main { public static void main(String[] args) throws Exception{Scanner sc = new Scanner(System.in);BigInteger sum = BigInteger.ZERO;long count=0;if(sc.hasNext()){String line=sc.nextLine();if(!line.isEmpty()){for(int i=0;i<line.length();i++){char c=line.charAt(i);if(Character.isDigit(c)){int v=Integer.parseInt(String.valueOf(c));sum=sum.add(BigInteger.valueOf(v+1));count++;}}}}}System.out.println("count="+count+" sum="+sum.toString());}
