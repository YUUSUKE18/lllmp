import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextInt()) {
            int count = scanner.nextInt(); // 読み取れる整数の数を指定
        } else {
            return; // 最初の行が整数でない場合は処理をスキップ
        }

        long sum = 0;
        int actualCount = 0;
        
        while (scanner.hasNext()) {
            if (scanner.hasNextInt()) {
                int nextInt = scanner.nextInt();
                sum += nextInt;
                actualCount++;
            } else if (scanner.hasNextLine()) {
                scanner.nextLine(); // 次の行をスキップ
            } else {
                break;
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
