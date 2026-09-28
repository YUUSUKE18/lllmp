import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int count = 0;
        boolean first = true;
        int[] numbers = new int[100];
        int[] numbersIndex = new int[100];
        for (int i = 0; i < numbersIndex.length; i++) {
            String nextLine = br.readLine();
            if (nextLine == null || nextLine.trim().isEmpty()) continue;
            try {
                int n = Integer.parseInt(nextLine.trim());
                if (first || n > target) {
                    max = n;
                    first = false;
                } else if (n == target) {
                    count++;
                    first = false;
                }
            } catch (NumberFormatException e) {}
        }
        System.out.println("pairs=" + count);
    }
}
