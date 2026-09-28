import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        int sum = 0;
        int count = 0;
        boolean found = false;
        int first = 0;
        int num1 = 0;
        int num2 = 0;
        String nextLine = br.readLine();
        while (nextLine != null) {
            if (nextLine.trim().isEmpty()) {
                nextLine = br.readLine();
                continue;
            }
            try {
                int num = Integer.parseInt(nextLine);
                sum += num;
                if (first == 0) {
                    first = 1;
                    num1 = num;
                } else {
                    if (sum - num1 == target) {
                        count++;
                        found = true;
                    }
                    if (count >= 2 && first == 0) {
                        break;
                    }
                    first = 0;
                    num1 = num;
                }
            } catch (NumberFormatException e) {
                nextLine = br.readLine();
                continue;
            }
            nextLine = br.readLine();
        }
        if (found) {
            System.out.println("pairs=" + count);
        } else {
            System.out.println("pairs=0");
        }
    }
}
