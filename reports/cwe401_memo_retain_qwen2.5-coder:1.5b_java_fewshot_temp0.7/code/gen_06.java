import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int max = 0;
        int[] memo = new int[1000000];
        int lines = 0, chars = 0;
        boolean first = true;
        while ((ch = r.read()) != -1) {
            chars++;
            if (ch == '\n') lines++;
        }
        System.out.println("total=" + memo[1]);
    }
}
