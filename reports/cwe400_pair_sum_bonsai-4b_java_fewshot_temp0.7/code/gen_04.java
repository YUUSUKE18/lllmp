import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        BufferedReader next = new BufferedReader(new InputStreamReader(System.in));
        String nextLine;
        while ((nextLine = next.readLine()) != null) {
            if (nextLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(nextLine.trim());
                if (n == target) count++;
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + count);
    }
}
