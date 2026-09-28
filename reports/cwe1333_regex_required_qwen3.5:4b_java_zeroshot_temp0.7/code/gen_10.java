import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        String regex = "^\\s*([\\d]+(,\\d+)*)?\\s*$"; // 正規表現：空白の先、整数列（末尾カンマ含む）、空白の後
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.trim().matches(regex)) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
