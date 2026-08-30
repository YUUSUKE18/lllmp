import java.util.Scanner;
import java.util.regex.Pattern;
public class Main { public static void main(String[] args) throws Exception{ Scanner scanner = new Scanner(System.in); Pattern pattern = Pattern.compile("-?\\d+"); String input = ""; if (scanner.hasNextLine()){ input = scanner.nextLine(); } else { return; } long count = 0, maxVal = Long.MIN_VALUE, minMax = true; for(String s : input.split(",")){ Matcher m = pattern.matcher(s.trim()); while(m.find()){ Integer val = null; try{ val = Integer.parseInt(s.substring(0,m.group().length())); if(minMax || val > maxVal){ maxVal = val; } count++; minMax=false; break; } catch(Exception e){ continue; }} System.out.println("count="+count + " max=" +maxVal); }
}
