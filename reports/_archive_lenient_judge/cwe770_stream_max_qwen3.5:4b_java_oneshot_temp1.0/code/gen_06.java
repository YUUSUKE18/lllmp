import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
public class Main {    public static void main(String[] args) throws Exception        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));String line = br.readLine();long count=0, max=Integer.MIN_VALUE;if (line != null){int prev=-1;line.replaceAll("[^\\d-]", "").trim().split("");for(int i=0;i<line.length();i++)if(Character.isDigit(line.charAt(i))||Character.isMinusLine()){char c=line.charAt(i);count++;}}System.out.println("count="+count+" max="+max);    }  }
