import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        int i = 0;
        int j = 0;
        while (i < j && j < line.length()) {
            while (j < line.length() && !Character.isDigit(line.charAt(j))) j++;
            int num1 = Integer.parseInt(line.substring(i, j));
            while (j < line.length() && Character.isDigit(line.charAt(j))) j++;
            int num2 = Integer.parseInt(line.substring(i, j));
            if (num1 + num2 == target) pairs++;
            i = j;
        }
        System.out.println("pairs=" + pairs);
    }
}
