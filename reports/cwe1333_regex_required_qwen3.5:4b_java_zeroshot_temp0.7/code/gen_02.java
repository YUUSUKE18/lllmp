import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        String line;
        while (sc.hasNextLine()) {
            line = sc.nextLine();
            if (line.isEmpty()) {
                continue;
            }
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            if (line.matches("^[\\s]*(-?\\d+(?:,\\s*-?\\d+)*)$")) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
